/**
 * JSON-LD as a real `<script>` tag. Next does not escape these; the payload is
 * always our own constants, never request input. `<` is escaped so a `</script>`
 * sequence in copy cannot break out of the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
