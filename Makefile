SOURCES=index.md
MARKDOWN=markdown

all: $(SOURCES:.md=.html)

%.html: %.md header.html footer.html
	(cat header.html; $(MARKDOWN) $<; cat footer.html) > $@

clean:
	rm -rf $(SOURCES:.md=.html)
