import App from './app';
const serve = App.instance;

serve.start( () => {
    console.log(`Server running on the port ${ serve.port }`);
});