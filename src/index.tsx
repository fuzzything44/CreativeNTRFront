import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './hello';
import { setup } from './setup';

setup();
ReactDOM.render(
    <HelloComponent/>,
    document.getElementById('root')
);

