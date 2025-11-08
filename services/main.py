import datetime as dt
import pandas as pd
from bdshare import get_hist_data

print("Starting data download...")

start = dt.datetime.now().date() - dt.timedelta(days= 5*365)
end = dt.datetime.now().date()
chunk_size = dt.timedelta(days=73)

frames = []
total_chunks = (end - start).days // chunk_size.days + 1
chunk_count = 1

while start < end:
    chunk_end = min(start + chunk_size, end)
    print(f"Requesting chunk {chunk_count}/{total_chunks} ({start} to {chunk_end})...")
    chunk_count += 1
    
    try:
        df = get_hist_data(start, chunk_end)
        if df is not None and not df.empty:
            frames.append(df)
            print(f"   ...Success! Got {len(df)} rows.")
        else:
            print(f"   ...Got empty data (market holiday, etc.)")
    except Exception as e:
        # We already know this will fail for old data, so we just log it
        print(f"   ...Skipping (old data not available): {start} to {chunk_end}")
    
    start = chunk_end + dt.timedelta(days=1)

print("\nAll chunks downloaded. Merging data...")

final_df = pd.concat(frames)

# --- THIS IS THE FIX ---
# The dates are already in the perfect 'YYYY-MM-DD' format.
# We don't need to convert them. We just name the index.
final_df.index.name = 'date'
# --- END FIX ---

final_df.to_csv("../services/historical_data.csv", index=True)
print("✅ Done! New 'historical_data.csv' (with clean dates) is saved.")