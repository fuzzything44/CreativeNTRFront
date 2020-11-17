import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { HelloComponent } from '../src/hello';

test("Tests can run", () => {
    // Some minor typescript, to ensure that ts is properly being used.
    const foo: string = "";
    // Some minor tsx, to ensure that tsx is properly being used.
    const bar: any = <div></div>;
});

test("Hello is hello", () => {
    expect(renderer.create(<HelloComponent />).toJSON()).toMatchSnapshot();
});