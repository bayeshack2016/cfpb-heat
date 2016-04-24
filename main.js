var CommentsCell = React.createClass({
  render: function(){
    return <td>{this.props.item.map(function(item, index){
      return <p key={index}>{item.comment}</p>;
    })}</td>;
  }
})

var SentimentRow = React.createClass({
  render: function(){
    console.log(this.props.cols)
    var topics = new Array(10)
    for (var i = topics.length - 1; i >= 0; i--) {
      topics[i] = []
    }
    for (var i = this.props.cols.length - 1; i >= 0; i--) {
      topics[this.props.cols[i].topic].push(this.props.cols[i])
    }

    return (
    <tr>
      {topics.map(function(cell, index) {
        return <CommentsCell key = {index} item = {cell}/>;
      })}
    </tr>
    );
  }
})

var InspectableTable = React.createClass({
  getInitialState: function() {
    return {
      selected: '',
    };
  },

  handleUserInput: function(selected) {
    this.setState({
      selected: selected
    });
  },

  render: function() {
    var sentiment_bins = new Array(10)
    for (var i = sentiment_bins.length - 1; i >= 0; i--) {
      sentiment_bins[i] = []
    }
    this.props.items.forEach(function(item){
      var sentiment_bin_index = Math.floor(item.sentiment*10)
      sentiment_bins[sentiment_bin_index].push(item)
    });
    var headings = Object.keys(this.props.items[0])
    console.log(headings)
    console.log(sentiment_bins)
    return (
      <div>
        <table>
          <tfoot>
            <tr>
              {headings.map(function(heading, index) {
                return <th key={index}>{heading}</th>;
              })}
            </tr>
          </tfoot>
          <tbody>
          {sentiment_bins.map(function(bin, index) {
            return <SentimentRow key={index} cols={bin}/>;
          })}
          </tbody>
        </table>

      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

var ITEMS = [
  {sentiment: '0.9', topic: '0', comment: 'asdfiasisns'},
  {sentiment: '0.2', topic: '0', comment: 'poqe'},
  {sentiment: '0.22', topic: '0', comment: 'galileo'},
  {sentiment: '0.27', topic: '0', comment: 'napoleon'},
  {sentiment: '0.7', topic: '2', comment: 'ieieie'},
]

ReactDOM.render(
  <InspectableTable items={ITEMS} />,
  document.getElementById('second')
);