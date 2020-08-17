import Head from 'next/head'
import Nav from './Nav.js';
// import Search from './Search.js';


const Layout = (props) => (
  <html>
    <Head>
      <title>Charging Stations</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css" />
      
    </Head>
    <body >
        <Nav />
        <div className="container">
        {/* <Search /> */}
        <div>
        {props.children}
        </div>
        </div>
        
    </body>
  </html>
)

export default Layout;