import datetime as dt
import pandas as pd
from bdshare import get_hist_data


start = dt.datetime.now().date() - dt.timedelta(days= 5*365)
end = dt.datetime.now().date()
chunk_size = dt.timedelta(days=73)

frames = []
total_chunks = (end - start).days // chunk_size.days + 1

while start < end:
    chunk_end = min(start+chunk_size, end)
    try:
        df = get_hist_data(start, chunk_end)
        if df is not None and not df.empty:
            frames.append(df)
            print(f"   ...Success! Got {len(df)} rows.")
        else:
            print("   ...Got empty data.")
    except Exception as e:
        print(f"   ...FAILED for {start} to {chunk_end}: {e}")
    
    start = chunk_end + dt.timedelta(days=1)
 

print("\nAll chunks downloaded. Merging data...")

final_df = pd.concat(frames)
final_df.index.name = 'date'

final_df.to_csv("historical_data.csv", index=True)
print("Done! Data saved to 'historical_data.csv'.")