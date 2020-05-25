// import App from 'next/app'
import Navbar from "../components/Navbar";
import buildClient from "../api/build-client";

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <Navbar currentUser={currentUser} />{" "}
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const { data } = await buildClient(appContext.ctx).get(
    "/api/users/currentuser"
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, ...data };
};

export default MyApp;
