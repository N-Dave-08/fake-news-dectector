import os
import csv
import sys

csv.field_size_limit(sys.maxsize)

# Path to the minimal FakeNewsNet dataset CSVs
DATASET_DIR = os.path.join(os.path.dirname(__file__), 'data', 'fakenewsnet_dataset')
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), 'fakenewsnet_processed.csv')

# List of dataset files and their labels
DATASET_FILES = [
    ('politifact_fake.csv', 'fake'),
    ('politifact_real.csv', 'real'),
    ('gossipcop_fake.csv', 'fake'),
    ('gossipcop_real.csv', 'real'),
]

def extract_articles_from_csv(csv_path, label):
    articles = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = row.get('title', '').strip()
            if title:
                articles.append({'text': title, 'label': label})
    return articles

def main():
    all_articles = []
    for filename, label in DATASET_FILES:
        csv_path = os.path.join(DATASET_DIR, filename)
        if not os.path.exists(csv_path):
            print(f"Warning: {csv_path} does not exist. Skipping.")
            continue
        print(f"Processing {filename}...")
        articles = extract_articles_from_csv(csv_path, label)
        all_articles.extend(articles)
    print(f"Total articles extracted: {len(all_articles)}")
    # Write to CSV
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['text', 'label'])
        writer.writeheader()
        for article in all_articles:
            writer.writerow(article)
    print(f"Saved processed data to {OUTPUT_CSV}")

if __name__ == '__main__':
    main() 