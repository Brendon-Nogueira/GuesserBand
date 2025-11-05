interface AlbumCoverProps {
  url: string;
  isBlurred: boolean;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ url, isBlurred }) => {
  // Estilo condicional para aplicar o filtro visual
  const filterStyle: React.CSSProperties = {
    filter: isBlurred ? 'blur(20px) grayscale(100%)' : 'none',
    transition: 'filter 2.0s ease-in-out', // Transição suave para revelar
  };

  return (
    <div className="album-cover-container">
      <img
        src={url}
        alt="Capa do Álbum"
        style={filterStyle}
      />
    </div>
  );
};

export default AlbumCover;