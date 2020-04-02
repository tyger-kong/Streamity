import React from "react";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';

import styles from './frontpage.module.css';
import CardButton from '../../components/CardButton';

const Frontpage = ({ handleChange }) => {
  return (
    <div className="App">
      Streamity
      <div>
      <Card classes={{root: styles.card}}>
        <CardActionArea classes={{root: styles.card}}>
          <CardContent>
            <AddIcon classes={{root: styles.icon}}/>
            <Typography color="textPrimary" gutterBottom>
              Create a Party
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    </div>
  );
};

Frontpage.defaultProps = {
  handleChange: () => {},
};

Frontpage.propTypes = {
  handleChange: PropTypes.func,
};

export default Frontpage;
