select json_build_object(
 'columns', (select json_agg(x order by x) from (select c.relname||'.'||a.attname||' '||format_type(a.atttypid,a.atttypmod)||case when a.attnotnull then ' NOT NULL' else '' end||coalesce(' DEFAULT '||pg_get_expr(d.adbin,d.adrelid),'') x
   from pg_attribute a join pg_class c on c.oid=a.attrelid left join pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
   where c.relnamespace='public'::regnamespace and c.relkind='r' and a.attnum>0 and not a.attisdropped and c.relname<>'_prisma_migrations') s),
 'constraints', (select json_agg(x order by x) from (select c.relname||' '||con.conname||' '||pg_get_constraintdef(con.oid) x from pg_constraint con join pg_class c on c.oid=con.conrelid where c.relnamespace='public'::regnamespace and c.relname<>'_prisma_migrations') s),
 'indexes', (select json_agg(x order by x) from (select indexdef x from pg_indexes where schemaname='public' and tablename<>'_prisma_migrations') s),
 'rls', (select json_agg(relname order by relname) from pg_class where relnamespace='public'::regnamespace and relkind='r' and relrowsecurity)
) as catalog;
