import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

class App extends Component {

    state = {
        gists: null
    }

    componentDidMount() {
        fetch('https://api.github.com/gists')
        .then(res => res.json())
        .then(gists => {
            this.setState({gists})
        });
    }
    render() {
        const { gists } = this.state;
        console.log(gists);
        return (
            <Router>
            <Root>
                <Sidebar>
                    { gists ? (
                        gists.map(gist => (
                         <SidebarItem key={gist.id}>
                            <Link to={`/g/${gist.id}`}>
                            { gist.description || '[No description]'}
                            </Link>
                         </SidebarItem>
                        ))
                    ) : (
                        <div> Loading ...</div>
                    )}
                </Sidebar>
                <Main>
                    <Route exact={true} path="/" render={() => (
                        <div> Welcome </div>
                    )}/>
                    { gists && (
                        <Route path="/g/:gistId" render={({match}) => (
                          <GIST gist={gists.find( g => g.id === match.params.gistId )} />
                        )}/>
                    )}
                </Main>
            </Root>
            </Router>
        );
    }
}

const GIST = ({gist}) => (
    <div>
        <h1>{gist.description}</h1>
        <ul>
            { Object.keys(gist.files).map(key => (
                <li key={key}>
                <b>{key}</b>
                {gist.files[key].row_url}
               </li>
            ))}

        </ul>
    </div>
)

const Root = (props) => (
    <div style={{
        display:'flex'
    }} {...props} />
)

const Sidebar = (props) => (
    <div style={{
        width: '33vw',
        height: '100vh',
        overflow: 'auto',
        background: '#eee'
    }} {...props} />
)

const SidebarItem = (props) => (
    <div style={{
        width: '33vw',
        height: '5vh',
        overflow: 'hidden',
        background: '#eee',
        padding: '5px 10px'
    }} {...props} />
)
const Main = (props) => (
    <div style={{
        flex: 1,
        height: '100vh',
        overflow: 'auto',
    }}>
        <div style={{padding:'20px'}} {...props} />
    </div>
)





export default App;
