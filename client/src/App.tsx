import './App.css';
import GetUrl from './modules/get_url/GetUrl';
import PostUrl from './modules/post_url/PostUrl';

function App() {
    return (
        <div className="App">
            <PostUrl />
            <GetUrl />
        </div>
    );
}

export default App;
