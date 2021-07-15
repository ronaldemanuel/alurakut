import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import FormInput from '../src/components/FormInput';
import ProfileSideBar from '../src/components/ProfileSideBar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';
import ProjectsBox from '../src/components/ProjectsBox';

// Home
export default function Home() {
  const githubUser = 'ronaldemanuel';
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'ronaldemanuel', 
    'felipefialho',
    'ronaldVader',
  ];
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    // Followers on GitHub API
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(async resServer => {
      const resFinal = await resServer.json();
      setFollowers(resFinal);
    })

    // Repositories on Github API
    fetch(`https://api.github.com/users/${githubUser}/repos`)
    .then(async resServer => {
      const resFinal = await resServer.json();
      setProjects(resFinal);
    })

    //Communities on Dato CMS; API GaphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST', // GET is default
      headers: {
        'Authorization': '001c91d815ed12fb12717cd274c2e3',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query { 
        allCommunities {
          id
          title
          imageUrl
          link
          creatorSlug
        }
      }`})
    })
    .then(async res => {
      const resFinal = await res.json();
      const communitiesFromCMS = resFinal.data.allCommunities;
      setCommunities(communitiesFromCMS);
    }) // Pega o retorno do responso.json() e já retorna
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
          <ProjectsBox projects={projects} githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const communityFromForm = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                link: dadosDoForm.get('link'),
                creatorSlug: githubUser,
              };

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(communityFromForm),
              })
              .then(async res => {
                const datas = await res.json();
                const community = datas.recordCreated;
                const communitiesUpdated = [...communities, community];
                setCommunities(communitiesUpdated);
              })
            }}>
              <FormInput 
                textDefault="Qual vai ser o nome da sua comunidade?"
                name="title"
              />
              <FormInput 
                textDefault="Coloque uma URL para usarmos de capa"
                name="image"
              />
              <FormInput 
                textDefault="Deixe um link para a comunidade"
                name="link"
              />
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((community, index, communities) => {
                if(index > (communities.length - 7)) {
                  return (
                    <li key={community.id}>
                      <a href={`/communities/${community.id}`} target="_blank">
                        <img src={community.imageUrl} />
                        <span>{community.title}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual, indice, items) => {
                if(indice > (items.length - 7)) {
                  return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}`} target="_blank">
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
