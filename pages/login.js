import React from 'react';
// Hook from Next
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={infoEvent => {
            infoEvent.preventDefault();
            console.log(githubUser);
            router.push('/');
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input 
              placeholder="Usuário" 
              value={githubUser} 
              onChange={(event) => {
                console.log(event.target.value);
                setGithubUser(event.target.value);
              }} />
              <p style={{marginBottom: '15px'}}>
                {githubUser.length == 0 
                  ? 'Preencha o campo' 
                  : ''} {/* // dentro da template do React, ele só permite usar operadores de curto-circuito (short-circuits)*/}
              </p>
            <button type="submit" style={{ backgroundColor: '#002d40' }}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong style={{ color: '#002d40' }}>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 