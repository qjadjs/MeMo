import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';



// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Register = () => {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const currentpassword = useRef();




  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const onhandlePost = async (data) => {
    const { email, username, password, currentpassword } = data;
    const user = { email, username, password, currentpassword };
  // post
  await axios
      .post('/auth/register', user)
      .then(function (response) {
        console.log(response, '성공');
        navigate('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };
  

  // form 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const joinData = {
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
      currentpassword: data.get('currentpassword'),
    };
    
    const { email, username, password, currentpassword } = joinData;

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }

    // 비밀번호 유효성 체크
  const passwordRegex = /^[a-zA-Zㄱ-힣0-9].{5,25}$/;
  if (!passwordRegex.test(password)) {
    setPasswordState('숫자+영문자 조합으로 6자리 이상 입력해주세요!');
  } else {
    setPasswordState('');
  }

  // 비밀번호 같은지 체크
  if (password !== currentpassword) {
    setPasswordError('비밀번호가 일치하지 않습니다.');
  } else {
    setPasswordError('');
  }

  // 이름 유효성 검사
    const usernameRegex = /^[가-힣a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
      setUserNameError('올바른 이름을 입력해주세요.');
    } else {
      setUserNameError('');
    }

    // 회원가입 동의 체크
    if (!checked) alert('회원가입 약관에 동의해주세요.');

    // 모든 검사를 통과하면 가입완료
    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === currentpassword &&
      usernameRegex.test(username) &&
      checked
    ) {
      console.log(joinData)
      onhandlePost(joinData);
    } 
  };

  return (
    <ThemeProvider theme={theme}>
    <div className='loginbutton' style={{ display: "flex", justifyContent: 'flex-end', marginRight: "50px"}}>
      

      <Link to='/login' style={{ textDecoration: "none",}}>
                <Button>Login</Button>
      </Link>
    </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>

                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소 ( example@example.com )"
                    error={emailError !== '' || false}
                    

                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자 6자리 이상)"
                    error={passwordState !== '' || false}
                    
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="currentpassword"
                    name="currentpassword"
                    label="비밀번호 재입력"
                    error={passwordError !== '' || false}
                    
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField 
                  required 
                  fullWidth id="username" 
                  name="username" label="이름" 
                  error={usernameError !== '' || false} />
                </Grid>
                <FormHelperTexts>{usernameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;