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
            followres: null,
            following: null
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
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
            followres: user.followres,
            following: user.following
        });
        console.log(user);
    }

    render() {
        let user;
        if(this.state.username) {
            user =
            <div>
                <ul className="infoProfile">
                    <li className="avatar">
                        <img src={this.state.avatar_url}/>
                    </li>
                    <li className="name">
                        <p>Name: {this.state.username}</p>
                    </li>
                    <li className="type">
                        <p>Type: {this.state.type}</p>
                    </li>
                    <li className="company">
                        <p>Company: {this.state.company}</p>
                    </li>
                    <li className="blog">
                        <p>Blog: {this.state.blog}</p>
                    </li>
                    <li className="location">
                        <p>Location: {this.state.location}</p>
                    </li>
                    <li className="email">
                        <p>E-mail: {this.state.email}</p>
                    </li>
                    <li className="bio">
                        <p>Bio: {this.state.bio}</p>
                    </li>
                    <li className="publicRepos">
                        <p>Public Repos: {this.state.public_repos}</p>
                    </li>
                    <li className="publicGists">
                        <p>Public Gists: {this.state.public_gists}</p>
                    </li>
                    <li className="followres">
                        <p>Followres: {this.state.followres}</p>
                    </li>
                    <li className="following">
                        <p>Following: {this.state.following}</p>
                    </li>
                </ul>
            </div>
        }
        return (
            <div className="search">
                <div className="header">
                    <h1 className="search-user">Encontre um usuário no GitHub.</h1>
                    <form id="search" onSubmit={e => this.handleSubmit(e)}>
                        <input ref="username" name="search" type="text"/>
                        <button className="button-search">Buscar</button>
                    </form>
                </div>
                <div className="descriptionUser">
                    <ul>
                        {user}
                    </ul>
                </div>
            </div>
        );
    }
}

//Exportando para que seja um módulo.
export default Aplication
