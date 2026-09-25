import { useRef, useState } from "react";

export default function Login() {


  const emailElement = useRef();
  const [validEmail, setValidEmail] = useState(true);
  function validateEmail() {
    const emailValue = emailElement.current.value; 
    setValidEmail(emailValue.includes('@'));
  }

  function signUpAction(formData){
    const email = formData.get("email");
  }
  return (
    <form action={signUpAction}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailElement} onBlur={validateEmail}/>
          {validEmail ? "" : 'Error'}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
