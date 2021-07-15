import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export default function ProfileRelationsBox(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.title} ({props.items.length})
            </h2>

            <ul>
                {props.items.map((itemAtual, indice, items) => {
                    if(indice > (items.length - 7)) {
                        return (
                            <li key={itemAtual.login}>
                                <a href={`https://github.com/${itemAtual.login}.png`} target="_blank">
                                    <img src={`https://github.com/${itemAtual.login}.png`} />
                                    <span>{itemAtual.login}</span>
                                </a>
                            </li>
                        )
                    }
                })}
            </ul>
                
        </ProfileRelationsBoxWrapper>
    )
}