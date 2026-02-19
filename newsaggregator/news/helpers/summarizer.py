from transformers import pipeline
def summarize_text(text):
    
    summarizer = pipeline("summarization")
    summary = summarizer(text[:1023], max_length=75, min_length=30, do_sample=False)
    summary = summary[0]['summary_text']
    return summary