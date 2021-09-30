import { AfterViewInit, Component } from '@angular/core';
import Grid, { GridOptions } from 'tui-grid';
import { CellRendererProps } from 'tui-grid/types/renderer';
import type { NumberField } from '@ni/nimble-components/dist/esm/number-field';
import '@ni/nimble-components/dist/esm/number-field';

class NimbleNumberEditor {
  public el: NumberField;
  constructor(private props: any) {
    const el = document.createElement('nimble-number-field') as NumberField;

    this.el = el;
    this.el.value = String(props.value);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }
}

class NimbleNumberRenderer {
  private el: NumberField;
  constructor(private props: any) {
    const el = document.createElement('nimble-number-field') as NumberField;

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props: any) {
    this.el.value = String(props.value);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'toastUIGridApp';

  public constructor() {
    Grid.applyTheme('striped');
  }

  ngAfterViewInit(): void {
    const treeData = [
      {
        name: 'Beautiful Lies',
        artist: 'Birdy',
        release: '2016.03.26',
        type: 'Deluxe',
        genre: 'Pop',
        nimble: 10
      },
      {
        name: 'X',
        artist: 'Ed Sheeran',
        release: '2014.06.24',
        type: 'Deluxe',
        genre: 'Pop',
        _attributes: {
          disabled: true // A current row is disabled
        }
      },
      {
        name: 'Moves Like Jagger',
        release: '2011.08.08',
        artist: 'Maroon5',
        type: 'Single',
        genre: 'Pop,Rock',
        _attributes: {
          checkDisabled: true // A checkbox is disabled only
        }
      },
      {
        name: 'A Head Full Of Dreams',
        artist: 'Coldplay',
        release: '2015.12.04',
        type: 'Deluxe',
        genre: 'Rock',
        _attributes: {
          checked: true, // A checkbox is already checked while rendering
          className: {
            // Add class name on a row
            row: ['red']
          }
        }
      },
      {
        name: '19',
        artist: 'Adele',
        release: '2008.01.27',
        type: 'EP',
        genre: 'Pop,R&B',
      },
      {
        name: '21',
        artist: 'Adele',
        release: '2011.01.21',
        type: 'Deluxe',
        genre: 'Pop,R&B'
      },
      {
        name: '25',
        artist: 'Adele',
        release: '2015.11.20',
        type: 'EP',
        genre: 'Pop',
        _attributes: {
          className: {
            // Add class name on each columns
            column: {
              name: ['status'],
            }
          }
        },
        _children: [
          {
            name: 'Chaos And The Calm',
            artist: '',
            release: '2015.03.23',
            type: 'EP',
            genre: 'Pop,Rock',
            _attributes: {
              className: {
                column: {
                  type: ['foo']
                }
              }
            },
            _children: [
              {
                name: 'Chaos And The Calm',
                artist: '',
                release: '2015.03.23',
                type: 'EP',
                genre: 'Pop,Rock',
                _attributes: {
                  className: {
                    column: {
                      type: ['foo']
                    }
                  }
                }
              },
              {
                name: 'Chaos And The Calm',
                artist: '',
                release: '2015.03.23',
                type: 'EP',
                genre: 'Pop,Rock',
                _attributes: {
                  className: {
                    column: {
                      type: ['foo']
                    }
                  }
                }
              }
            ]
          }]
      }
    ];

    const options: GridOptions = {
      el: document.getElementById('grid')!,
      data: treeData as any,
      treeColumnOptions: {
        name: 'name',
        useCascadingCheckbox: false,
        useIcon: false
      },
      columns: [
        {
          header: 'Name',
          name: 'name',
          width: 300,
          renderer: {
            styles: {
              iconClass: (props: CellRendererProps) => {
                const cell = props.grid.getElement(props.rowKey, props.columnInfo.name);
                return cell?.className ? cell.className : '';
              }
            },
            classNames: ['not-enough']
          }
        },
        {
          header: 'Artist',
          name: 'artist'
        },
        {
          header: 'Type',
          name: 'type'
        },
        {
          header: 'Release',
          name: 'release'
        },
        {
          header: 'Genre',
          name: 'genre'
        },
        {
          header: 'Nimble!',
          name: 'nimble',
          editor: {
            type: NimbleNumberEditor
          },
          renderer: {
            type: NimbleNumberRenderer,
            options: {
              min: 1,
              max: 5
            }
          }
        }
      ]
    };

    const grid = new Grid(options);
  }
}
