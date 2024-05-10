var React = require('react');
var DefaultLayout = require('./Layout/default');

function About(props) {
  return (
    <DefaultLayout title={props.title}>
      <div class="container mt-4" >
        <div class="row">
          <div class="col s12">
            View <a href="https://d1eagk8n8oi8q1.cloudfront.net/resume.pdf"
              target="_blank"
            >my resume</a>
          </div>
          <div class="col s12">
            <a href="https://www.amazon.com/Little-Book-Pot-Odds-Principle-ebook/dp/B0871LGSCB/ref=sr_1_1"
              target="_blank"
            >Poker</a> and <a href="https://www.amazon.com/Why-are-Probably-Alone-Infinity-ebook/dp/B08R24LLHY/ref=sr_1_2"
              target="_blank"
            >philosophy</a> books
          </div>
          <div class="col s12">
            <a href="https://www.goodreads.com/user/show/7217962-owen-tuleja"
              target="_blank"
            >GoodReads profile</a>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = About;