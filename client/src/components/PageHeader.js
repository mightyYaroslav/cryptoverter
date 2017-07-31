import React, {Component} from 'react';
import { Header, Icon } from 'semantic-ui-react';
import '../stylesheets/PageHeader.css';

class PageHeader extends Component {
    render() {
        return (
            <div className="PageHeader">
                <Header as="h1" icon>
                    <Icon name="money" />
                    crypto exchanger.
                </Header>
            </div>
        );
    }
}

export default PageHeader;