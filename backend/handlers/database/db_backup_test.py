import unittest

import sqlite3


class TestBackup(unittest.TestCase):

    def test_backup_users(self):
        brownerr = sqlite3.connect('../../brownerr.db')
        brownerr_backup = sqlite3.connect('brownerr_backup.db')
        expected_output = brownerr.execute("SELECT * FROM User").fetchall()
        self.assertEqual(brownerr_backup.execute("SELECT * FROM User").fetchall(), expected_output)

        brownerr.close()
        brownerr_backup.close()

    # TODO: Check why this fails?
    def test_backup_transactions(self):
        brownerr = sqlite3.connect('../../brownerr.db')
        brownerr_backup = sqlite3.connect('brownerr_backup.db')
        expected_output = brownerr.execute("SELECT * FROM Transaction").fetchall()
        self.assertEqual(brownerr_backup.execute("SELECT * FROM Transaction").fetchall(), expected_output)

        brownerr.close()
        brownerr_backup.close()

    def test_backup_services(self):
        brownerr = sqlite3.connect('../../brownerr.db')
        brownerr_backup = sqlite3.connect('brownerr_backup.db')
        expected_output = brownerr.execute("SELECT * FROM Service").fetchall()
        self.assertEqual(brownerr_backup.execute("SELECT * FROM Service").fetchall(), expected_output)

        brownerr.close()
        brownerr_backup.close()

    def test_backup_jobs(self):
        brownerr = sqlite3.connect('../../brownerr.db')
        brownerr_backup = sqlite3.connect('brownerr_backup.db')
        expected_output = brownerr.execute("SELECT * FROM Job").fetchall()
        self.assertEqual(brownerr_backup.execute("SELECT * FROM Job").fetchall(), expected_output)

        brownerr.close()
        brownerr_backup.close()
