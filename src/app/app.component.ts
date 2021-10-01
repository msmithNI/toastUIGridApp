import { AfterViewInit, Component } from '@angular/core';
import Grid, { GridOptions } from 'tui-grid';
import { CellRendererProps } from 'tui-grid/types/renderer';
import type { NumberField } from '@ni/nimble-components/dist/esm/number-field';
import '@ni/nimble-components/dist/esm/number-field';
import { TextField } from '@microsoft/fast-foundation';

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
    return parseFloat(this.el.value);
  }
}

class NimbleNumberRenderer {
  static cache: WeakMap<HTMLElement, NumberField[]> = new WeakMap<HTMLElement, NumberField[]>();

  private el: NumberField;
  private gridElement: HTMLElement;
  constructor(private props: any) {
    const gridElement = props.grid.el;
    this.gridElement = gridElement;
    let cachedElements: NumberField[];
    /*
    // Cache doesn't really gain us much, the <tr> is still thrown away once you scroll away, and we
    // still have to remove/readd to DOM, re-layout, etc
    if (!NimbleNumberRenderer.cache.has(gridElement)) {
      cachedElements = [];
      NimbleNumberRenderer.cache.set(gridElement, cachedElements);
    } else {
      cachedElements = NimbleNumberRenderer.cache.get(gridElement) as NumberField[];
    }
    let el = cachedElements.pop();*/
    let el;
    if (!el) {
      el = document.createElement('nimble-number-field') as NumberField;
      //console.log('new NumberField');
    } else {
      //console.log('from cache');
    }


    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  mounted(parentElement: HTMLElement) {
    // console.log('mounted', this.el, parentElement);
  }

  getValue() {
    return this.el.value;
  }

  render(props: any) {
    this.el.value = String(props.value);
  }

  beforeDestroy() {
    //NimbleNumberRenderer.cache.get(this.gridElement)?.push(this.el);
  }
}

class NimbleTextRenderer {
  private el: TextField;
  private gridElement: HTMLElement;
  constructor(private props: any) {
    const gridElement = props.grid.el;
    this.gridElement = gridElement;
    const el = document.createElement('nimble-text-field') as TextField;

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  mounted(parentElement: HTMLElement) {
    // console.log('mounted', this.el, parentElement);
  }

  getValue() {
    return this.el.value;
  }

  render(props: any) {
    this.el.textContent = String(props.value);
  }

  beforeDestroy() {
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
    for (let i = 0; i < 100; i++) {
      treeData.push({
        name: i.toString(),
        artist: 'Adele',
        release: '2008.01.27',
        type: 'EP',
        genre: 'Pop,R&B',
      });
    }

    const options: GridOptions = {
      el: document.getElementById('grid')!,
      bodyHeight: 600,
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
          name: 'artist',
          renderer: {
            type: NimbleTextRenderer
          }
        },
        {
          header: 'Type',
          name: 'type'
        },
        {
          header: 'Release',
          name: 'release',
          editor: {
            type: NimbleNumberEditor
          },
          renderer: {
            type: NimbleNumberRenderer
          }
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
            type: NimbleNumberRenderer
          }
        }
      ]
    };

    const grid = new Grid(options);
  }
}
