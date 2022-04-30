import logo from '../by-43.svg';



const Footer = () => (
  <footer>
    <p>
      This is an example React app.
      <br/>
      <a href='https://github.com/Lab43/example-scorekeeper'>
        View the source code on GitHub.
      </a>
    </p>
    <p>
      <a href='https://www.lab43.com'>
        <img src={logo} alt='By 43' width='82' height='46'/>
      </a>
    </p>
  </footer>
);

export default Footer;
