import unittest
from rating_sort import sort
from mocked_ratings import data


class TestSortByRating(unittest.TestCase):

    def test_sort_by_rating(self):
        expected_output = '[{"id": 8, "name": "Hrighton", "rating": 5.0}, ' \
                          '{"id": 3, "name": "Charlie", "rating": 4.9},' \
                          ' {"id": 5, "name": "Evan", "rating": 4.5},' \
                          ' {"id": 4, "name": "David", "rating": 4.3},' \
                          ' {"id": 6, "name": "Frank", "rating": 3.5},' \
                          ' {"id": 1, "name": "Alice", "rating": 3.2},' \
                          ' {"id": 2, "name": "Bob", "rating": 2.0},' \
                          ' {"id": 7, "name": "Geicko", "rating": 1.7}]'
        self.assertEqual(sort(data), expected_output)


if __name__ == '__main__':
    unittest.main()
