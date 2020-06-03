import React from 'react';
import { Container, Jumbotron, Table } from 'reactstrap';
import { User } from '../models/User';
// import { Role } from '../models/Role';
import { ViewHeader } from '../components/ViewHeader';
import { UserInfoTable } from '../components/UserInfoTable';
import { UserEditTable } from '../components/UserEditTable';

// Changed props to any to avoid trouble with compiling
interface IHomeProps {
    loggedInUser?: User | null;
    setAppUser: (user : User) => void;
}

interface IHomeState {
    edit: boolean;
}

export class Home extends React.Component<IHomeProps, IHomeState> {
    
    constructor(props : IHomeProps) {
        super(props);
        this.state = {
            edit: false
        };
    }

    toggleEdit = () => {
        if(this.state.edit) {
            this.setState({edit: false});
        } else {
            this.setState({edit: true});
        }
        
    }
    
    render() {
        return (
            <div>
                <ViewHeader loggedInUser={this.props.loggedInUser ? this.props.loggedInUser : null} />
                <Container>
                    {!this.state.edit ? 
                        <UserInfoTable loggedInUser={this.props.loggedInUser ? this.props.loggedInUser : null} toggleEdit={this.toggleEdit}/>
                    :   <UserEditTable 
                            loggedInUser={this.props.loggedInUser ? this.props.loggedInUser : null} 
                            toggleEdit={this.toggleEdit}
                            setAppUser={this.props.setAppUser}
                        />
                    }
                </Container>
            </div>
        );
    }
}