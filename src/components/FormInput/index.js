export default function FormInput(props) {
    return (
    <div>
        <input 
            placeholder={props.textDefault} 
            name={props.name} 
            aria-label={props.textDefault}
            type="text"
        />
    </div>
    )
}