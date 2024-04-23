import type { Virtualizer } from '@tanstack/react-virtual';
import { useStylesheet } from '@ui5/webcomponents-react-base';
import React, { forwardRef, Fragment } from 'react';
import type { DivWithCustomScrollProp } from '../types/index.js';
import { classNames, styleData } from './Resizer.module.css.js';
import { ColumnHeader } from './index.js';

interface ColumnHeaderContainerProps {
  headerProps: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerGroup: Record<string, any>;
  onSort: (e: CustomEvent<{ column: unknown; sortDirection: string }>) => void;
  onGroupByChanged: (e: CustomEvent<{ column?: Record<string, unknown>; isGrouped?: boolean }>) => void;
  resizeInfo: Record<string, unknown>;
  isRtl: boolean;
  portalContainer: Element;
  columnVirtualizer: Virtualizer<DivWithCustomScrollProp, Element>;
  uniqueId: string;
  showVerticalEndBorder: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
  rowTextClass: string;
  dispatch: (e: { type: string; payload?: any }) => void;
}

export const ColumnHeaderContainer = forwardRef<HTMLDivElement, ColumnHeaderContainerProps>((props, ref) => {
  const {
    headerProps,
    headerGroup,
    onSort,
    onGroupByChanged,
    resizeInfo,
    isRtl,
    portalContainer,
    columnVirtualizer,
    uniqueId,
    showVerticalEndBorder,
    rows,
    rowTextClass,
    dispatch
  } = props;

  useStylesheet(styleData, 'Resizer');

  // Double click resizes column
  const dubClickBehav = async (id: string) => {
    let largest = 0;
    for (let i = 0; i < rows.length; i++) {
      // Use the classname for the span where the text lives AnalyticalTable.module.css.js
      const collection = document.getElementsByClassName(rowTextClass);
      const current = findWidth(rows[i].values[id], collection[0]);
      largest = current > largest ? current : largest;
    }
    // Assign extra padding
    largest += 20;
    // Smallest column allowed is 60px
    largest = largest < 60 ? 60 : largest;
    dispatch({
      type: "DOUBLE_CLICK_RESIZE",
      payload: { [id]: largest },
    });
  };

  return (
    <div
      {...headerProps}
      style={{ width: `${columnVirtualizer.getTotalSize()}px` }}
      ref={ref}
      data-component-name="AnalyticalTableHeaderRow"
    >
      {columnVirtualizer.getVirtualItems().map((virtualColumn, index) => {
        const column = headerGroup.headers[virtualColumn.index];
        if (!column) {
          return null;
        }
        const isLastColumn = !column.disableResizing && virtualColumn.index + 1 === headerGroup.headers.length;
        const resizerDirectionStyle = isRtl
          ? {
              right: `${column.totalFlexWidth + column.totalLeft - (isLastColumn ? 3 : 0)}px`,
              transform: 'translateX(50%)'
            }
          : {
              left: `${column.totalFlexWidth + column.totalLeft - (isLastColumn ? 3 : 0)}px`,
              transform: 'translateX(-50%)'
            };

        const { key, ...rest } = column.getHeaderProps();
        return (
          <Fragment key={key}>
            {column.canResize && column.getResizerProps && (
              <div
                {...column.getResizerProps()}
                data-resizer
                className={classNames.resizer}
                style={resizerDirectionStyle}
                onDoubleClick={() => {
                  dubClickBehav(rest);
                }}
              />
            )}
            <ColumnHeader
              {...rest}
              showVerticalEndBorder={showVerticalEndBorder}
              id={`${uniqueId}${rest?.id ?? ''}`}
              columnId={rest.id}
              visibleColumnIndex={index}
              onSort={onSort}
              onGroupBy={onGroupByChanged}
              headerTooltip={column.headerTooltip}
              isDraggable={(column.canReorder || !column.disableDragAndDrop) && !resizeInfo.isResizingColumn}
              virtualColumn={virtualColumn}
              columnVirtualizer={columnVirtualizer}
              isRtl={isRtl}
              portalContainer={portalContainer}
            >
              {column.render('Header')}
            </ColumnHeader>
          </Fragment>
        );
      })}
    </div>
  );
});

ColumnHeaderContainer.displayName = 'ColumnHeaderContainer';

// Text Width Analysis
function getTextWidth(text: string, font: string) {
  // Reusing the canvas is more efficient
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function getCssStyle(element: Element, prop: string) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el: Element = document.body) {
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "12px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

const findWidth = (text: string, el: Element) => {
  return getTextWidth(text, getCanvasFont(el));
};