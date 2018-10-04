import React from "react"

class Aplication extends React.Component {
    constructor() {
        super();
        this.state = {
            avatar_url: null,
            username: null,
            type: null,
            company: null,
            blog: null,
            location: null,
            email: null,
            bio: null,
            public_repos: null,
            public_gists: null,
            followers: null,
            following: null,
            name: null
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }

    getUserRepos(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let user = await this.getUser(this.refs.username.value);
        this.setState({
            avatar_url: user.avatar_url,
            username: user.name,
            type: user.type,
            company: user.company,
            blog: user.blog,
            location: user.location,
            email: user.email,
            bio: user.bio,
            public_repos: user.public_repos,
            public_gists: user.public_gists,
            followers: user.followers,
            following: user.following
        });
        console.log(user);

        let repositories = await this.getUserRepos(this.refs.username.value);
        this.setState({
            name: repositories.name,
            description: repositories.description,
            size: repositories.size,
            url: repositories.url
        });
        console.log(repositories);
    }

    render() {
        let user;
        let repositories;
        if(this.state.username) {
            user =
            <div>
                <ul className="infoProfile">
                    <li className="avatar">
                        <img src={this.state.avatar_url}/>
                    </li>
                    <li className="name">
                        <p><label>Name:</label> {this.state.username}</p>
                    </li>
                    <li className="type">
                        <p><label>Type:</label> {this.state.type}</p>
                    </li>
                    <li className="company">
                        <p><label>Company:</label> {this.state.company}</p>
                    </li>
                    <li className="blog">
                        <p><label>Blog:</label> {this.state.blog}</p>
                    </li>
                    <li className="location">
                        <p><label>Location:</label> {this.state.location}</p>
                    </li>
                    <li className="email">
                        <p><label>E-mail:</label> {this.state.email}</p>
                    </li>
                    <li className="bio">
                        <p><label>Bio:</label> {this.state.bio}</p>
                    </li>
                    <li className="publicRepos">
                        <p><label>Public Repos:</label> {this.state.public_repos}</p>
                    </li>
                    <li className="publicGists">
                        <p><label>Public Gists:</label> {this.state.public_gists}</p>
                    </li>
                    <li className="followres">
                        <p><label>Followers:</label> {this.state.followers}</p>
                    </li>
                    <li className="following">
                        <p><label>Following:</label> {this.state.following}</p>
                    </li>
                </ul>
            </div>

            repositories =
             <div>
                 <ul className="repoResults">
                     <li className="repo-name">
                         <p>Name: {this.state.name}</p>
                     </li>
                     <li className="repo-description">
                         <p>Description: {this.state.description}</p>
                     </li>
                     <li className="repo-size">
                         <p>Size: {this.state.size}</p>
                     </li>
                     <li className="repo-url">
                         <p>Url: {this.state.url}</p>
                     </li>
                 </ul>
             </div>
        }

        return (
            <div className="search">
                <div className="header">
                    <h1 className="search-user">Encontre um usuário no GitHub.</h1>
                    <form id="search" onSubmit={e => this.handleSubmit(e)}>
                        <input ref='username' name='search' type='text' placeholder='username'/>
                        <button className="button-search">Buscar</button>
                    </form>
                </div>
                <ul>
                    {user}
                </ul>
                <ul>
                    {repositories}
                </ul>
            </div>
        );
    }
}

//Exportando para que seja um módulo.
export default Aplication
