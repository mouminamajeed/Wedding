import { Carousel } from 'react-bootstrap';

function CarouselCard() {
  return (
    <Carousel>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://weddingcardinvites.files.wordpress.com/2022/01/laser-cut-muslim-wedding-cards.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Invitation Cards</h3>
          <p>We got a wide variety of invitation cards for you. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://cdn.mos.cms.futurecdn.net/2nPAyuKxsXdZ37wsiKrCbF.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Wedding Photographers</h3>
          <p>
            Professional Photographers who make you feel at ease and capture the best moments of your life.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0575/9605/1635/files/Capture_ead9ea81-6f80-46c4-8470-836f4930b64f.png?v=1660929963&width=550"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Nikah Namah</h3>
          <p>Looking for nikah nama online? Shop for the best nikah nama from our collection of exclusive, customized & handmade products</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;