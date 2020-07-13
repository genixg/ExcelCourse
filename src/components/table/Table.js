import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(15, 30)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      $resizer.css({position: 'fixed'})

      if (type === 'col') {
        $resizer.css({
          top: coords.top + 'px',
          height: this.$root.$el.clientHeight + 'px',
          left: event.pageX + 'px'
        })
      } else {
        $resizer.css({
          top: event.pageY + 'px',
          width: this.$root.$el.clientWidth + 'px',
          left: coords.left + 'px'
        })
      }

      document.onmousemove = e => {
        if (type === 'col') {
          $resizer.css({left: e.pageX + 'px'})
        } else {
          $resizer.css({top: e.pageY + 'px'})
        }
      }

      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        $resizer.css({position: 'absolute'})

        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.css({width: value + 'px'})
          this.$root.findAll(`[data-col="${$parent.data.col}"]`).forEach(cell => {
            cell.style.width = value + 'px'
          })

          $resizer.css({
            right: 0,
            left: null,
            height: null,
            bottom: 0,
            top: 0
          })
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: value + 'px'})

          $resizer.css({
            bottom: 0,
            left: 0,
            right: 0,
            top: null
          })
        }
      }
    }
  }
}
