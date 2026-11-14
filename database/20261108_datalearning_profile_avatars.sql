-- DataLearning profile photos — optional one-time setup, 8 November 2026.
-- Dedicated, PRIVATE bucket: signed URLs are generated per authenticated owner.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('datalearning-avatars', 'datalearning-avatars', false, 2097152,
        ARRAY['image/webp','image/jpeg','image/png'])
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "dalp_avatars_select_own" ON storage.objects;
CREATE POLICY "dalp_avatars_select_own" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'datalearning-avatars' AND (storage.foldername(name))[1] = (select auth.uid())::text);

DROP POLICY IF EXISTS "dalp_avatars_insert_own" ON storage.objects;
CREATE POLICY "dalp_avatars_insert_own" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'datalearning-avatars' AND (storage.foldername(name))[1] = (select auth.uid())::text);

DROP POLICY IF EXISTS "dalp_avatars_update_own" ON storage.objects;
CREATE POLICY "dalp_avatars_update_own" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'datalearning-avatars' AND (storage.foldername(name))[1] = (select auth.uid())::text)
WITH CHECK (bucket_id = 'datalearning-avatars' AND (storage.foldername(name))[1] = (select auth.uid())::text);

DROP POLICY IF EXISTS "dalp_avatars_delete_own" ON storage.objects;
CREATE POLICY "dalp_avatars_delete_own" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'datalearning-avatars' AND (storage.foldername(name))[1] = (select auth.uid())::text);
