import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as SpeechToTextActions from '../actions/speechToText';

function mapStateToProps(state) {
  return {
    speechToText: state.speechToText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SpeechToTextActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
