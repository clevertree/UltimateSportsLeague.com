import * as React from "react";
import Markdown from 'markdown-to-jsx';
import PropTypes from "prop-types";


export default class MarkdownContent extends React.Component {
    /** Property validation **/
    static propTypes = {
        file: PropTypes.string.isRequired,
    };

    static defaultProps = {
        options: {
            wrapper: 'article',
            forceWrapper: true
        },
        className: "markdown-body"
    }

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loaded: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.file !== this.props.file) {
            // console.log("Reloading content: ", this.props.file);
            this.loadContent();
        }
    }

    componentDidMount() {
        // console.log("Loading content: ", this.props.file);
        this.loadContent();
    }

    async loadContent() {
        const filePath = this.props.file;
        const response = await fetch(filePath);
        const content = await response.text()
        this.setState({content, loaded: true});
    }

    render() {
        return (
            <Markdown {...this.props} file={null}>
                {this.state.loaded ? this.state.content : "Loading Markdown page: " + this.props.file}
            </Markdown>
        );
    }
}
