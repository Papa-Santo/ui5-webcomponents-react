## Methods

This component exposes public methods. You can invoke them directly on the instance of the component, e.g. by using React Refs.

| Name           | Parameters                                                                                                                                                                                                                                                                                                                            | Description                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **close**      | &mdash;                                                                                                                                                                                                                                                                                                                               | Closes the popover/dialog.                                                                                       |
| **isOpen**     | &mdash;                                                                                                                                                                                                                                                                                                                               | Tells if the responsive popover is open                                                                          |
| **showAt**     | <dl><dt className="methodText">**opener**</dt><dd className="methodText">the element that the popover is shown at</dd><dd><code>HTMLElement</code></dd></dl><dl><dt className="methodText">**preventInitialFocus**</dt><dd className="methodText">Prevents applying the focus inside the popup</dd><dd><code>boolean</code></dd></dl> | Shows popover on desktop and dialog on mobile.                                                                   |
| **applyFocus** | &mdash;                                                                                                                                                                                                                                                                                                                               | Focuses the element denoted by <code>initialFocus</code>, if provided, or the first focusable element otherwise. |