import unittest
from rating_sort import sort_provider, sort_recipient
from mocked_ratings import data


class TestSortByRating(unittest.TestCase):

    def test_sort_by_rating_provider(self):
        expected_output = '[{"id": 8, "name": "Hrighton", "rating_provider": 5.0, "rating_recipient": 3.7}, ' \
                          '{"id": 3, "name": "Charlie", "rating_provider": 4.9, "rating_recipient": 3.3},' \
                          ' {"id": 5, "name": "Evan", "rating_provider": 4.5, "rating_recipient": 4.2},' \
                          ' {"id": 4, "name": "David", "rating_provider": 4.3, "rating_recipient": 4.7},' \
                          ' {"id": 6, "name": "Frank", "rating_provider": 3.5, "rating_recipient": 4.9},' \
                          ' {"id": 1, "name": "Alice", "rating_provider": 3.2, "rating_recipient": 2.9},' \
                          ' {"id": 2, "name": "Bob", "rating_provider": 2.0, "rating_recipient": 3.6},' \
                          ' {"id": 7, "name": "Geicko", "rating_provider": 1.7, "rating_recipient": 5.0}]'
        self.assertEqual(sort_provider(data), expected_output)

    def test_sort_by_rating_recipient(self):
        expected_output = '[{"id": 7, "name": "Geicko", "rating_provider": 1.7, "rating_recipient": 5.0}, ' \
                          '{"id": 6, "name": "Frank", "rating_provider": 3.5, "rating_recipient": 4.9},' \
                          ' {"id": 4, "name": "David", "rating_provider": 4.3, "rating_recipient": 4.7},' \
                          ' {"id": 5, "name": "Evan", "rating_provider": 4.5, "rating_recipient": 4.2},' \
                          ' {"id": 8, "name": "Hrighton", "rating_provider": 5.0, "rating_recipient": 3.7},' \
                          ' {"id": 2, "name": "Bob", "rating_provider": 2.0, "rating_recipient": 3.6},' \
                          ' {"id": 3, "name": "Charlie", "rating_provider": 4.9, "rating_recipient": 3.3},' \
                          ' {"id": 1, "name": "Alice", "rating_provider": 3.2, "rating_recipient": 2.9}]'
        self.assertEqual(sort_recipient(data), expected_output)

if __name__ == '__main__':
    unittest.main()
