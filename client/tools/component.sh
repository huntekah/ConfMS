#!/bin/bash

if [ $# = 2 ]; then
    COMPONENT_NAME=$1
    COMPONENT_PATH="src/$2/${COMPONENT_NAME,,}"
elif [ $# = 1 ]; then
    COMPONENT_NAME=$1
    COMPONENT_PATH="src/${COMPONENT_NAME,,}"
else
    echo "Not enough arguments"
    exit 1
fi

mkdir -p $COMPONENT_PATH
cd $COMPONENT_PATH

COMPONENT_CONTAINER_NAME=${COMPONENT_NAME}Container
COMPONENT_STYLE_NAME="${COMPONENT_NAME}.styles"
echo "\
import React, {Component} from 'react';
import {$COMPONENT_CONTAINER_NAME} from \"./$COMPONENT_STYLE_NAME\";
import PropTypes from 'prop-types';

class $COMPONENT_NAME extends Component {
    render() {
        return (
            <$COMPONENT_CONTAINER_NAME>
            </$COMPONENT_CONTAINER_NAME>
        );
    }
}

$COMPONENT_NAME.propTypes = {};
$COMPONENT_NAME.defaultProps = {};

export default $COMPONENT_NAME
" > "$COMPONENT_NAME.js"
echo "Created $COMPONENT_PATH/$COMPONENT_NAME.js"

echo "\
import styled from \"styled-components\";

export const $COMPONENT_CONTAINER_NAME = styled.div\`
\`;
" > "$COMPONENT_STYLE_NAME.js"
echo "Created $COMPONENT_PATH/$COMPONENT_STYLE_NAME.js"
