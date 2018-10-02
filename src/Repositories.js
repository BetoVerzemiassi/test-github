import React from "react"

class Repositories extends React.Component {
    constructor() {
        super();
        this.state = {
            avatar_url: null,
            description: null,
            name: null,
            login: null,
            url: null,
            followers_url: null,
            following_url: null,
            email: null,
            gists_url: null,
            starred_url: null,
            subscriptions_url: null,
            organizations_url: null,
            repos_url: null,
            events_url: null,
            received_events_url: null,
            type: null,
            branches_url: null,
            commits_url: null,
            size: null
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let repos = await this.getUser(this.refs.username.value);
        this.setState({
            avatar_url: repos.avatar_url,
            description: repos.description,
            name: repos.name,
            login: repos.login,
            url: repos.url,
            followers_url: repos.followers_url,
            following_url: repos.following_url,
            email: repos.email,
            gists_url: repos.gists_url,
            starred_url: repos.starred_url,
            subscriptions_url: repos.subscriptions_url,
            organizations_url: repos.organizations_url,
            repos_url: repos.repos_url,
            events_url: repos.events_url,
            received_events_url: repos.received_events_url,
            type: repos.type,
            branches_url: repos.branches_url,
            commits_url: repos.commits_url,
            size: repos.size
        });
        console.log(repos);
    }

    render() {
        let repos;
        if(this.state.username) {
            repos =
            <div>
                <ul className="infoRepos">
                    <li className="avatar">
                        <img src={this.state.avatar_url}/>
                    </li>
                    <li className="description">
                        <p>Description: {this.state.description}</p>
                    </li>
                    <li className="name">
                        <p>Name: {this.state.username}</p>
                    </li>
                </ul>
            </div>
        }
        return (
            <div className="repositories">
                <h1 className="listRepos">Lista de Repositórios do Usuário</h1>
                <button className="button-Repos" onSubmit={e => this.handleSubmit(e)}>Repositórios</button>
            </div>
        );
    }

}

//Exportando para que seja um módulo.
export default Repositories
