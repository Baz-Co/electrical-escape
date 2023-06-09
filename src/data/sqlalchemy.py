from sqlalchemy import MetaData, Table, Column, Integer, String, Identity, DateTime, ForeignKey, Sequence
import logging
from pytube import YouTube, Channel
import re
import json
import YouTubeCloneAPI.Downloading.TimedTextToSRT
from sqlalchemy.orm import registry

mapper_registry = registry()


def apply_schema(sqlite_engine):
    logging.debug("Applying database shema.")
    user_metadata.create(bind=sqlite_engine, checkfirst=True)
    video_metadata.create(bind=sqlite_engine, checkfirst=True)
    download_status.create(bind=sqlite_engine, checkfirst=True)
    captions_metadata.create(bind=sqlite_engine, checkfirst=True)
    logging.debug("All tables created successfully.")

# Define the table to store users

user_metadata = Table(
    "user_metadata",
    mapper_registry.metadata,
    Column('id', Integer, Sequence("video_id_seq", start=1), primary_key=True, autoincrement=True),
    Column("username", String(None), unique=True, nullable=False),
    Column("author_name", String(None), nullable=False),
    Column("channel_url", String(None), unique=True, nullable=False),
    Column("channel_id", String(None), unique=True, nullable=False)
)

class UserMetadata:
    pass

mapper_registry.map_imperatively(UserMetadata, user_metadata)


def retrieve_video_user_metadata_from_video(pytube_video):
    channel = Channel(pytube_video.channel_url)

    metadata={}
    metadata.update({
#        "id": -1,        
        "username": "@" + channel.initial_data['metadata']['channelMetadataRenderer']['ownerUrls'][0].split("@")[1],
        "author_name": pytube_video.author,
        "channel_url": pytube_video.channel_url,
        "channel_id": pytube_video.channel_id
    })
    
    return metadata

# Define the table to store metadata about videos

video_metadata = Table(
    "video_metadata",
    mapper_registry.metadata,
    Column('id', Integer, Sequence("video_id_seq", start=1), primary_key=True, autoincrement=True),
    Column('youtube_video_id', String(None), nullable=False),
    Column('user_id', Integer, ForeignKey("user_metadata.id")),
    Column("username", String(None), nullable=False),
    Column("title", String(None), nullable=False),
    Column("url", String(None), nullable=False),
    Column("local_path", String(None), nullable=False),
    Column("resolution", String(None), nullable=False),
    Column("file_name", String(None), nullable=False),
    Column("format", String(None), nullable=False),
    Column("video_codec", String(None), nullable=False),
    Column("audio_codec", String(None), nullable=False),
    Column("filesize_bytes", String(None), nullable=False),
    Column("thumbnail_url", String(None), nullable=False),  
    Column("thumbnail_local_path", String(None), nullable=False),
    Column("view_count", Integer), 
    Column("like_count", Integer), 
    Column("upload_date", DateTime),
    Column("duration_seconds", Integer),
    Column("description", String(None))
)

class VideoMetadata:
    pass

mapper_registry.map_imperatively(VideoMetadata, video_metadata)


def retrieve_video_metadata_from_video(pytube_video):
    channel = Channel(pytube_video.channel_url)    
    
    like_template = r'[0-9]{1,3},?[0-9]{0,3},?[0-9]{0,3} like'
    likes = re.search(like_template, json.dumps(pytube_video.initial_data)).group(0)
    like_count = int(likes.split(" ")[0].replace(",",""))

    highest_resolution = pytube_video.streams.get_highest_resolution()

    metadata={}
    metadata.update({
#        "id": -1,
        "youtube_video_id": pytube_video.video_id,
        "user_id": -1,
        "username": "@" + channel.initial_data['metadata']['channelMetadataRenderer']['ownerUrls'][0].split("@")[1],
        "title": pytube_video.title,
        "url": pytube_video.watch_url,
        "local_path": "",
        "resolution": highest_resolution.resolution,
        "file_name": highest_resolution.default_filename,
        "format": highest_resolution.subtype,
        "video_codec": highest_resolution.video_codec,
        "audio_codec": highest_resolution.audio_codec,
        "filesize_bytes": highest_resolution.filesize,
        "thumbnail_url": pytube_video.thumbnail_url,
        "thumbnail_local_path": "",
        "view_count": pytube_video.views,
        "like_count": like_count,
        "upload_date": pytube_video.publish_date,
        "duration_seconds": pytube_video.length,
        "description": pytube_video.description
    })
    
    return metadata

# Define the table to store information about the videos being downloaded

download_status = Table(
    "download_status",
    mapper_registry.metadata,
    Column('video_id', Integer, ForeignKey("video_metadata.id"), primary_key=True),
    Column("start_time", DateTime, nullable=True),
    Column("end_time", DateTime, nullable=True),
    Column("status", String(None))
)

class DownloadStatus:
    pass

mapper_registry.map_imperatively(DownloadStatus, download_status)


DOWNLOAD_NOT_STARTED = "Not Started"
DOWNLOAD_STARTED = "Started"
DOWNLOAD_ERROR = "ERROR"
DOWNLOAD_COMPLETE = "Complete"

def create_empty_download_status():
    return {
#            "video_id": video_metadata["id"],
            "start_time": None,
            "end_time": None,
            "status": YouTubeCloneAPI.Data.DatabaseSchema.NOT_STARTED
    }

# Define the table to store information about the subtitles

captions_metadata = Table(
    "captions_metadata",
    mapper_registry.metadata,
    Column('id', Integer, Sequence("caption_id_seq", start=1), primary_key=True, autoincrement=True),
    Column('video_id', Integer),
    Column("name", String(None)),
    Column("code", String(None)),
    Column("youtube_xml_captions", String(None)),
    Column("srt_captions", String(None)),
    Column("local_path", String(None))
)

class CaptionsMetadata:
    pass

mapper_registry.map_imperatively(CaptionsMetadata, captions_metadata)


def retrieve_captions_metadatas_from_video(pytube_video):
    metadatas = []
    for caption in pytube_video.captions:
        metadata = {
            "video_id": -1,
            "name": caption.name,
            "code": caption.code,
            "youtube_xml_captions": caption.xml_captions,
            "srt_captions": YouTubeCloneAPI.Downloading.TimedTextToSRT.xml_caption_to_srt(caption.xml_captions)
        }
        metadatas.append(metadata)
    return metadatas
