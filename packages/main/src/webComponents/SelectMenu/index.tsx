'use client';

import '@ui5/webcomponents/dist/SelectMenu.js';
import type { ReactNode } from 'react';
import { withWebComponent } from '../../internal/withWebComponent.js';
import type { CommonProps, Ui5DomRef } from '../../types/index.js';

interface SelectMenuAttributes {}

interface SelectMenuDomRef extends SelectMenuAttributes, Ui5DomRef {}

interface SelectMenuPropTypes extends SelectMenuAttributes, Omit<CommonProps, keyof SelectMenuAttributes> {
  /**
   * Defines the options of the component.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `SelectMenu` is meant to be used together with the `Select` component as alternative to define the select's dropdown. It acts as a popover on desktop and tablet, and as a Dialog on phone.
 *
 * The component gives the possibility to the user to customize the `Select`'s dropdown by slotting custom options and adding custom styles.
 *
 * __Note:__ This component is a web component developed by the UI5 Web Components’ team.
 *
 * [UI5 Web Components Storybook](https://sap.github.io/ui5-webcomponents/playground/?path=/docs/main-SelectMenu)
 */
const SelectMenu = withWebComponent<SelectMenuPropTypes, SelectMenuDomRef>(
  'ui5-select-menu',
  [],
  [],
  [],
  [],
  () => import('@ui5/webcomponents/dist/SelectMenu.js')
);

SelectMenu.displayName = 'SelectMenu';

export { SelectMenu };
export type { SelectMenuDomRef, SelectMenuPropTypes };
