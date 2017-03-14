# ReactJS open-source Spreadsheets and Data grids

## Minimum requirements
1. Should be a table/list/spreadsheet
2. Nested headers
3. Fixed bottom row
4. Paging or Scrolling
    1. Paging
    2. Scrolling
        1. Lazy loading
        2. Virtual rendering, render only visible part of the data.
5. Edit?
6. Graph chart?

## Some comparison
1. jgui.table
    - Based on antd.
    - Pros:
        1. Managed by Jingoal.
        2. Nested headers.
    - Cons:
        2. Does not support lazy loading.
        3. Does not support virtual rendering.

2. handsontable
    - Stars: 7678
    - Pros:
        1. Nested headers, fixed bottom row, summary calculations, filtering, insert and remove rows and columns.
        2. Lazy loading.
        3. Virtual rendering.
    - Cons: 
        1. Nested headers, summary calculations and filtering are paid functions.

3. react-virtualized
    - Stars: 4918
    - Pros:
        1. Virtual rendering.
    - Cons:
        1. Does not support nested headers.

4. fixed-data-rable
    - Stars: 3614
    - Pros:
        1. Virtual rendering
        2. Nested headers
    - Cons: 
        1. The original repo is no longer maintained