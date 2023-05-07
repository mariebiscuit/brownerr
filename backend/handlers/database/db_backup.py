import sqlite3
import io

conn = sqlite3.connect('../../brownerr.db')

# Open() function
with io.open('backupdatabase_dump.sql', 'w') as p:
    # iterdump() function
    for line in conn.iterdump():
        p.write('%s\n' % line)

print(' Backup performed successfully!')
print(' Data Saved as backupdatabase_dump.sql')

# Create a new database
new_conn = sqlite3.connect('brownerr_backup.db')

# Open the SQL dump file
with io.open('backupdatabase_dump.sql', 'r') as f:
    sql = f.read()

# Execute the SQL commands to create the tables and insert the data
new_conn.executescript(sql)

# Commit the changes and close the connections
new_conn.commit()
new_conn.close()
conn.close()

print('New database created successfully!')
