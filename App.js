import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

// Tooltip component
const Tooltip = ({ children, text }) => (
  <div className="tooltip">
    {children}
    <span className="tooltiptext">{text}</span>
  </div>
);

// SentimentHighlighter component
const SentimentHighlighter = ({ content, analytics }) => {
  const sentimentColors = {
    positive: '#D9F2DD',
    negative: '#F2DBD9',
    mixed: '#8bd6d3d',
    neutral: '#eaf9b6b'
  };

  const highlightSentences = () => {
    let highlightedContent = [];
    let lastIndex = 0;

    analytics.forEach((analytic) => {
      const { sentences, sentiment, topic } = analytic;
      sentences.forEach((sentence) => {
        const startIndex = content.indexOf(sentence, lastIndex);
        const endIndex = startIndex + sentence.length;

        if (startIndex > lastIndex) {
          highlightedContent.push(content.slice(lastIndex, startIndex));
        }

        highlightedContent.push(
          <Tooltip key={startIndex} text={topic}>
            <span className={`highlight ${sentiment.toLowerCase()}`}>
              {sentence}
            </span>
          </Tooltip>
        );

        lastIndex = endIndex;
      });
    });

    if (lastIndex < content.length) {
      highlightedContent.push(content.slice(lastIndex));
    }

    return highlightedContent;
  };

  return <div>{highlightSentences()}</div>;
};

const Review = ({ review, onBookmarkToggle }) => (
  <div className="review">
    <div className="review-header">
      <h3>{review.reviewer_name}</h3><span> wrote a review at </span> <span className="name">booking.com</span>
      <div 
      className={`bookmark ${review.bookmarked ? 'bookmarked' : ''}`} 
      onClick={() => onBookmarkToggle(review.review_id)}
      >
      <FontAwesomeIcon icon={review.bookmarked ? fasBookmark : farBookmark} />
    </div>
    </div>
    <span className="date">{review.date}</span>
    <div className="rating">
      <StarRating score={review.rating_review_score} outOf={review.out_of} />
      <span className="rating-text">
        {review.rating_review_score}/{review.out_of}
      </span>
    </div>
    <SentimentHighlighter content={review.content} analytics={review.analytics} />
  </div>
);

// ReviewList component
const ReviewList = ({ reviews, onBookmarkToggle }) => (
  <div className="review-list">
    {reviews.map((review, index) => (
      <Review key={index} review={review} onBookmarkToggle={onBookmarkToggle} />
    ))}
  </div>
);

// Main App component
const App = () => {
const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // In a real scenario, you'd fetch from an API. For Codepen, we'll use dummy data.
    const dummyReviews = [
          {
      "review_id": "123456",
      "reviewer_name": "Amgad",
      "content": "Exceptional! \nPros : Beautiful location, staff so friendly especially host Miss Duksin. Fishing trip is very nice, we catch fish and cooked in same restaurant. It was amazing. Food is very delicious and fresh.",
      "date": "06 May 2022",
      "rating_review_score": 5,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "en",
      "source_hotel_code_": "",
      "source_review_id": "838fa7fb77ff177d",
      "category": "staff",
      "phrases": "staff",
      "sentences": "staff so friendly especially host Miss Duksin.",
      "topic": "staff",
      "sentiment": "Positive",
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": [
          {
          "category": "staff",
          "topic": "staff",
          "phrases": [
            "staff"
          ],
          "sentences": [
          "staff so friendly"
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              25,
              192,
              "Positive"
            ]
          ]
          },        
          {
          "category": "food and drinks",
          "topic": "food and drinks",
          "phrases": [
            "fish"
          ],
          "sentences": [
          "Fishing trip is very nice, we catch fish and cooked in same restaurant. It was amazing. Food is very delicious and fresh."
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              25,
              192,
              "Positive"
            ]
          ]
        }
      ],
      "highlight_indices": [
        [
          25,
          192,
          "Positive"
        ]
      ]
    },
    {
      "review_id": "123459",
      "reviewer_name": "Carole",
      "content": "Wonderful !!",
      "date": "17 Apr 2022",
      "rating_review_score": 5,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "en",
      "source_hotel_code_": "",
      "source_review_id": "95f07a7dfceb595f",
      "category": null,
      "phrases": null,
      "sentences": null,
      "topic": null,
      "sentiment": null,
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": []
    },
    {
      "review_id": "1234512",
      "reviewer_name": "Cristina",
      "content": "The best service ever!Never found before a staff so professional and kind like in Fushifaru.",
      "date": "03 Apr 2022",
      "rating_review_score": 5,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "en",
      "source_hotel_code_": "",
      "source_review_id": "ba53bd7f135b98aa",
      "category": "service",
      "phrases": "service",
      "sentences": "best service",
      "topic": "service",
      "sentiment": "Positive",
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": [
        {
          "category": "service",
          "topic": "service",
          "phrases": [
            "service"
          ],
          "sentences": [
            "best service"
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              -1,
              26,
              "Positive"
            ]
          ]
        },
        {
          "category": "staff",
          "topic": "staff",
          "phrases": [
            "staff"
          ],
          "sentences": [
   "Never found before a staff so professional and kind like in Fushifaru."
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              -1,
              108,
              "Positive"
            ]
          ]
        }
      ],
    },
    {
      "review_id": "123457",
      "reviewer_name": "Vladimir",
      "content": "Don't go to Fushifaru!! There are lots of other decent islands out there! Cons: It's dirty, there are cockroaches in the villa of different sizes, it's full of mosquitoes, neither the villa has ever been disinfected in 15 days. Very poor cleaning of the villa!! The beach is very dirty : dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste and other rubbish! Only 2 restaurants with a meager assortment, very few fruits, and no exotic ones at all. We will also eat bananas and apples in Moscow!!",
      "date": "25 Jan 2022",
      "rating_review_score": 2,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "ru",
      "source_hotel_code_": "",
      "source_review_id": "57ce91782d03c4e2",
      "category": "beach",
      "phrases": "beach",
      "sentences": "The beach is very dirty : dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste and other rubbish!",
      "topic": "beach",
      "sentiment": "Negative",
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": [
        {
          "category": "beach",
          "topic": "beach",
          "phrases": [
            "beach"
          ],
          "sentences": [
            "The beach is very dirty : dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste and other rubbish!"
          ],
          "sentiment": "Negative",
          "highlight_indices": [
            [
              461,
              578,
              "Negative"
            ]
          ]
        },
        {
          "category": "restaurant",
          "topic": "restaurant",
          "phrases": [
            "no exotic"
          ],
          "sentences": [
            "Only 2 restaurants with a meager assortment, very few fruits, and no exotic ones at all."
          ],
          "sentiment": "Negative",
          "highlight_indices": [
            [
              461,
              578,
              "Negative"
            ]
          ]
        }
      ],
      "highlight_indices": [
        [
          461,
          578,
          "Negative"
        ]
      ]
    },
    {
      "review_id": "123455",
      "reviewer_name": "Andressa",
      "content": "Exceeded expectations! Pros: The place is amazing in every way! Starting with service. The team, always present, calls us by name and, after the first contacts, they already know our preferences. Our island guide, Chelsea, besides being super pleasant and polite, was always available for a good conversation or to prepare any tour, dinner, or request we had. He and the whole team certainly made our season there something more than special! The island is super well located and allows for fantastic snorkeling. Marine life is rich and abundant, and we were able to be close to rays, sharks, fish of all colors, and Mantas! An incredible place to eat well, relax, and connect with nature.",
      "date": "25 Nov 2021",
      "rating_review_score": 5,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "pt",
      "source_hotel_code_": "",
      "source_review_id": "9c8c51a0d0d97b7d",
      "category": "service",
      "phrases": "service",
      "sentences": "Exceeded expectations! Pros: The place is amazing in every way! Starting with service.",
      "topic": "service",
      "sentiment": "Positive",
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": [
               {
          "category": "service",
          "topic": "service",
          "phrases": [
            "service"
          ],
          "sentences": [
          "Exceeded expectations! Pros: The place is amazing in every way! Starting with service."
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              162,
              174,
              "Positive"
            ]
          ]
        }, 
        {
          "category": "staff",
          "topic": "staff",
          "phrases": [
            "team",
            "guide",
            "team",
            "team",
            "guide",
            "team"
          ],
          "sentences": [
"The team, always present, calls us by name and, after the first contacts, they already know our preferences. Our island guide, Chelsea, besides being super pleasant and polite, was always available for a good conversation or to prepare any tour, dinner, or request we had. He and the whole team certainly made our season there something more than special!",
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              180,
              271,
              "Positive"
            ],
            [
              289,
              421,
              "Positive"
            ],
            [
              452,
              522,
              "Positive"
            ]
          ]
        },
        {
          "category": "food and drinks",
          "topic": "food and drinks",
          "phrases": [
            "to eat"
          ],
          "sentences": [
          "An incredible place to eat well, relax, and connect with nature."],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              609,
              705,
              "Positive"
            ]
          ]
        }
      ],
      "highlight_indices": [
        [
          609,
          705,
          "Positive"
        ]
      ]
    },
    {
      "review_id": "1234511",
      "reviewer_name": "Torsten",
      "content": "Full recommendation. Incredibly good.\nPros: The staff is incredibly friendly and customer focused. Thank you, Chelsea, Tameel, Neelam, Thoha, Tami and all the others. It was a perfect stay with you. Cons : Nothing at all.",
      "date": "20 Nov 2021",
      "rating_review_score": 5,
      "hotel_code": "ZMVLHIFF",
      "hotel_reply": "",
      "source_language": "en",
      "source_hotel_code_": "",
      "source_review_id": "ba48331bbcd52f0a",
      "category": "experience",
      "phrases": "stay",
      "sentences": "It was a perfect stay with you.",
      "topic": "experience",
      "sentiment": "Positive",
      "out_of": 5,
      "review_url": "https://www.booking.com/hotel/mv/fushifarumaldives.html",
      "source": {
        "code": "2",
        "name": "booking.com",
        "icon": "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
        "image": "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png"
      },
      "bookmarked": false,
      "bookmark_pk": 0,
      "analytics": [
        {
          "category": "staff",
          "topic": "staff",
          "phrases": [
            "staff"
          ],
          "sentences": [
            "The staff is incredibly friendly and customer focused."
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              83,
              128,
              "Positive"
            ]
          ]
        },
        {
          "category": "experience",
          "topic": "experience",
          "phrases": [
            "stay"
          ],
          "sentences": [
            "It was a perfect stay with you."
          ],
          "sentiment": "Positive",
          "highlight_indices": [
            [
              209,
              232,
              "Positive"
            ]
          ]
        }
      ],
      "highlight_indices": [
        [
          83,
          128,
          "Positive"
        ]
      ]
    } 
      // (Keep the dummyReviews array as it is)
    ];
    setReviews(dummyReviews);
  }, []);

  const handleBookmarkToggle = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId
          ? { ...review, bookmarked: !review.bookmarked }
          : review
      )
    );
  };

  return (
    <div className="app">
      <h1>Review Sentiment Analysis</h1>
      <ReviewList reviews={reviews} onBookmarkToggle={handleBookmarkToggle} />
    </div>
  );
};

const StarRating = ({ score, outOf }) => {
  const stars = [];
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;

  for (let i = 1; i <= outOf; i++) {
    if (i <= fullStars) {
      stars.push(<span key={i} className="star full">★</span>);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
};
export default App;