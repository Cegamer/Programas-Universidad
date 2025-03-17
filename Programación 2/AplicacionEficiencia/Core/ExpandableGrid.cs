using System.Windows;
using System.Windows.Controls;

namespace AplicacionEficiencia.Core
{
    public class ExpandableGrid
    {
        private Grid layout;
        public int maxColumns { get; }
        public int maxRows { get; private set; }
        public int space { get; private set; }
        public int height { get; }
        public int xPos { get; private set; }
        public int yPos { get; private set; }
        public bool lastSpace { get; private set; }

        public ExpandableGrid(ref Grid grid, int colums, int height, int space = 5, bool lastSpace = false)
        {
            this.layout = grid;
            this.xPos = 0;
            this.yPos = 0;
            this.maxColumns = colums;
            this.space = space;
            this.height = height;
            this.lastSpace = lastSpace;
            ExpandColumns();
            ExpandRows();
        }

        public void Pop()
        {
            
        }

        private void Last()
        {

        }

        public void Insert(UIElement element)
        {
            layout.Children.Add(element);
            Grid.SetColumn(element, xPos);
            Grid.SetRow(element, yPos);
            Next();
        }

        private void Next()
        {
            if (xPos == 2 * maxColumns - 2)
            {
                xPos = 0;
                yPos += 2;
                InsertVerticalSpace();
                ExpandRows();
            }
            else
            {
                xPos += 2;
            }
        }

        public void Reset()
        {
            this.xPos = 0;
            this.yPos = 0;
            this.layout.Children.Clear();
            this.layout.ColumnDefinitions.Clear();
            this.layout.RowDefinitions.Clear();
            ExpandColumns();
            ExpandRows();
        }

        public bool IsFull() => (xPos == maxColumns - 1) && (yPos == maxRows - 1);

        private void InsertHorizontalSpace()
        {
            var spaceDef = new ColumnDefinition();
            spaceDef.Width = new GridLength(space, GridUnitType.Pixel);
            layout.ColumnDefinitions.Add(spaceDef);
        }

        private void InsertVerticalSpace()
        {
            var spaceDef = new RowDefinition();
            spaceDef.Height = new GridLength(space);
            layout.RowDefinitions.Add(spaceDef);
        }

        private void ExpandColumns()
        {
            for(int i = 0; i < maxColumns; i++)
            {
                var columnDef = new ColumnDefinition();
                columnDef.Width = new GridLength(1, GridUnitType.Star);
                layout.ColumnDefinitions.Add(columnDef);
                if (i != maxColumns - 1 || lastSpace)
                    InsertHorizontalSpace();
            }
        }

        private void ExpandRows() 
        {
            var rowDef = new RowDefinition();
            rowDef.Height = new GridLength(height, GridUnitType.Pixel);
            layout.RowDefinitions.Add(rowDef);
        }
    }
}