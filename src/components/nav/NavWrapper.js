import React, {Component} from "react";
import {withRouter} from 'react-router-dom';

class NavWrapper extends Component {

    constructor(props) {
        super(props);
        this.listener = {
            onClick: e => this.onClick(e)
        }
        this.ref = {
            router: React.createRef()
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.listener.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.listener.onClick);
    }

    render() {
        return this.props.children;
    }


    onClick(e) {
        let target = e.target;
        while (target && target.nodeName.toLowerCase() !== 'a') {
            target = target.parentNode;
        }
        if (target
            && target.nodeName.toLowerCase() === 'a'
            && target.target !== '_blank') {
            // console.log("Click target: ", target);

            const url = new URL(target.href);
            if (url.origin !== window.location.origin) {
                target.setAttribute('target', '_blank');
                // Allow navigation
            } else if (url.hash
                || url.pathname.endsWith('.pdf')
            ) {
                // Allow local navigation

            } else {
                e.preventDefault();
                this.props.history.push(url.pathname);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
}

export default withRouter(NavWrapper)