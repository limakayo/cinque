import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import Downshift from 'downshift'

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(params) {
  const { suggestion, index, itemProps, highlightedIndex } = params;
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion._id}
      selected={isHighlighted}
      component="div"
    >
      {suggestion.nome}
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { classes, containerProps, children } = options;

  return (
    <Paper {...containerProps} square className={classes.paper}>
      {children}
    </Paper>
  );
}

function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.nome.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 3;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

function handleSelected(handleSuggestionSelected, suggestion) {
  handleSuggestionSelected(suggestion)
}

const styles = theme => ({
  container: {
    position: 'relative',
  },
  textField: {
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: '100%',
    zIndex: 1
  }
});

function ClienteDownshift(props) {
  const { classes, suggestions, handleSuggestionSelected } = props;

  return (
    <Downshift
      itemToString={item => (item ? item.nome : '')}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div className={classes.container}>
          {renderInput(
            getInputProps({
              classes,
              placeholder: 'Nome do cliente',
              id: 'integration-downshift',
              autoFocus: true
            }),
          )}
          {isOpen
            ? renderSuggestionsContainer({
                classes,
                children: getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem,
                  }),
                ),
              })
            : null}
        </div>
      )}
      onChange={selectedItem => handleSelected(handleSuggestionSelected, selectedItem)}
    />
  );
}

ClienteDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClienteDownshift);
