import React from "react";
import Slider from "react-slick";

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
            name: null,
            description: null,
            size: null,
            url: null,
            language: null,
            id: null,
            starred_url: null,
            commits_url: null,
            git_url: null,
            name: null,
            infoRepos: [],
            infoReposStar: []
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
                this.setState({
                    infoRepos: response,
                })
                return response;
            })
    }


    getUserStarred(username) {
        return fetch(`https://api.github.com/users/${username}/starred`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    infoReposStar: response,
                })
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
            language: repositories.language,
            html_url: repositories.html_url
        });
        console.log(repositories);

        let starred = await this.getUserStarred(this.refs.username.value);
        this.setState({
            name: starred.name,
            description: starred.description,
            id: starred.id,
            html_url: starred.html_url
        });
        console.log(starred);
    }

    render() {
        const settings = {
			dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 5000,
            autoplaySpeed: 3000,
            cssEase: "linear"
		};
        let user;
        if(this.state.username) {
            user =
            <div className="card">
                <div className="card-body">
                    <ul className="infoProfile">
                        <li className="avatar">
                            <img className="card-img-top rounded float-right img-thumbnail rounded-circle" src={this.state.avatar_url}/>
                        </li>
                        <li className="name">
                            <p><label>Nome:</label> {this.state.username}</p>
                        </li>
                        <li className="type">
                            <p><label>Tipo de Usuário:</label> {this.state.type}</p>
                        </li>
                        <li className="company">
                            <p><label>Empresa:</label> {this.state.company}</p>
                        </li>
                        <li className="blog">
                            <p><label>Blog:</label> {this.state.blog}</p>
                        </li>
                        <li className="location">
                            <p><label>Localização:</label> {this.state.location}</p>
                        </li>
                        <li className="email">
                            <p><label>E-mail:</label> {this.state.email}</p>
                        </li>
                        <li className="bio">
                            <p><label>Biografia:</label> {this.state.bio}</p>
                        </li>
                        <li className="publicRepos">
                            <p><label>Repositórios Públicos:</label> {this.state.public_repos}</p>
                        </li>
                        <li className="publicGists">
                            <p><label>Repositórios Privados:</label> {this.state.public_gists}</p>
                        </li>
                        <li className="followres">
                            <p><label>Seguidores:</label> {this.state.followers}</p>
                        </li>
                        <li className="following">
                            <p><label>Seguindo:</label> {this.state.following}</p>
                        </li>
                        <div>                           
                            <h1 className="h1 info-repos">Info Repositories</h1>                            
                        </div>
                        <div>
                            <Slider {...settings}>                                                                       
                                <div>
                                    {this.state.infoRepos.map(repo => (
                                        <div>
                                            <p>{repo.name}</p>
                                            <p>{repo.description}</p>
                                            <p>{repo.size}</p>
                                            <p>{repo.language}</p>
                                            <p><a href={repo.html_url} target="_blank">Ver Repositório Completo</a></p>
                                        </div>
                                    ))}
                                </div>
                            </Slider>
                        </div>
                        <div>                            
                            <h2 className="h1 info-starred">Info Starred</h2>                            
                        </div>
                        <div>
                            <Slider {...settings}>                                                                    
                                <div>
                                    {this.state.infoReposStar.map(repostars => (
                                        <ul>
                                            <li>{repostars.name}</li>
                                            <li>{repostars.description}</li>
                                            <li>{repostars.id}</li>
                                            <li><a href={repostars.html_url} target="_blank">Ver no GitHub</a></li>
                                        </ul>
                                    ))}
                                </div>
                            </Slider>
                        </div>
                    </ul>
                </div>
            </div>
        }

        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div className="header">
                                <h1 className="h1 search-user">Encontre um usuário no GitHub.</h1>
                                <form id="search" onSubmit={e => this.handleSubmit(e)}>
                                    <div className="form-group form-row align-input">
                                        <div className="input-group input-group-lg col-md-6">
                                            <input className="form-control text-center" ref='username' name='search' type='text' placeholder='username'/>
                                            <button className="btn btn-primary search-button">Buscar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ul>
                        {user}
                    </ul>
                </div>
            </div>
        );
    }
}



//Exportando para que seja um módulo.
export default Aplication;
